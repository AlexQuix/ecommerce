import {MutableRefObject, useRef, useEffect, useState} from "react";
import anime, {EasingOptions, AnimeParams} from "animejs";
import { useDispatch } from "react-redux";
import { loadPageActions } from "../store/slices/loadPage";

export type AnimeTarget = HTMLDivElement | HTMLButtonElement | HTMLDivElement[];

export interface IAnimeConfig{
    duration: number;
    delay: number;
    easing: EasingOptions;
    direction?: "state"|"reverse"
}

export interface IStyle{
    rotate?: number | number[];
    rotateY?: number | number[];
    rotateX?: number | number[];
    scale?: number | number[];
    translateX?: number | number[];
    translateY?: number | number[];
    skew?: number | number[];

    opacity?: number | number[];
    width?: string | string[];
    height?: string | string[];
}

export interface IAnimeState{
    play: boolean; 
    pause: boolean;
    begin: boolean;
    completed: boolean;
    initialMode: boolean;
    reverseMode: boolean;
}

export interface IAnimeHook extends IAnimeState {
    playAnime: (direction: "normal" | "reverse")=>void;
    events: (eventStates:IAnimeEvent)=>void;
    direction: "normal" | "reverse";
    setDirection: (value:"normal" | "reverse")=>void;
}

export interface IAnimeTimelineHook extends IAnimeHook{
    addAnimation: (element: AnimeTarget, style: IStyle, timelineOffset:number | string)=>void
}

export interface IStoredAnimations{
    e: AnimeTarget;
    style: IStyle; 
    timelineOffset: number | string
};

export interface IAnimeEvent{
    onBegin?: () => void, 
    onComplete?: () => void,
    onReverseBegin?: () => void, 
    onReverseComplete?: () => void
}

// The useAnime hook takes in three parameters: 
// `target`, `style`, and `config`. 
// It returns an object that contains the state of the animation (`animeState`) 
// and methods to control it (`playAnime` and `events`).
export function useAnime(
    target: AnimeTarget, 
    style: IStyle,
    config: IAnimeConfig = {
        duration: 500,
        easing: "linear",
        delay: 0
    },
  ):IAnimeHook{
    // State to keep track of the direction of the animation.
    // It can either be "normal" or "reverse".
    let [animeDirection, setAnimeDirection] = useState<"normal"|"reverse">();
    // State to keep track of whether the animation should execute or not.
    let [animeExec, setAnimeExec] = useState(false);
    // State to keep track of the state of the animation.
    let [animeState, setAnimeState] = useState<IAnimeState>({
        play: false,
        pause: true,
        begin: false,
        completed: true,
        initialMode: true,
        reverseMode: false,
    });
    // State to keep track of the events that should trigger during the animation.
    let [events, setEvents] = useState<IAnimeEvent>({});
  
    // The useEffect hook is called whenever any of the dependencies (target, events, 
    // animeDirection, animeExec) change. It starts the animeConfig object which 
    // contains the necessary configuration for the anime.js library.
    useEffect(()=>{
        let { pause, initialMode, reverseMode } = animeState;
        // If the target is not available, the animation is paused or the animation is 
        // currently executing, return early.
        if(!target || pause || animeExec || !animeDirection) return;

        let animeConfig: AnimeParams = {
            targets: target,
            ...config,
            ...style,
            direction: animeDirection,
            
        };
        
        // If the anime is in the normal direction,
        // set up the animeConfig with the appropriate functions.
        if(animeDirection === "normal"){
            animeConfig.begin = ()=>{
                setAnimeExec(true);
                setAnimeState((prev)=> ({
                    ...prev,
                    begin: true,
                    completed: false
                }));
  
                if(events.onBegin) 
                    events.onBegin();
            };
            animeConfig.complete = ()=>{
                setAnimeExec(false);
                setAnimeState({
                    begin: false,
                    completed: true,
                    play: false,
                    pause: true,
                    initialMode: false,
                    reverseMode: true
                });
  
                if(events.onComplete) 
                    events.onComplete();
            }
        }

        // If the anime is in the reverse direction,
        // set up the animeConfig with the appropriate functions.
        if(animeDirection === "reverse"){
            animeConfig.begin = ()=>{
                setAnimeExec(true);
                setAnimeState((prev)=> ({
                    ...prev,
                    begin: true,
                    completed: false
                }));

                if(events.onReverseBegin) 
                    events.onReverseBegin();
            }
            animeConfig.complete = ()=>{
                setAnimeExec(false);
                setAnimeState((prev)=>({
                    ...prev,
                    play: false,
                    pause: true,
                    begin: false,
                    completed: true,
                    initialMode: true,
                    reverseMode: false
                }));

                if(events.onReverseComplete) 
                    events.onReverseComplete();
            }
        }

        anime(animeConfig); 
    }, [target, events, animeDirection, animeExec]);

    return {
        ...animeState,
        direction: animeDirection!,
        setDirection(value){
            setAnimeDirection(value);
        },
        playAnime(direction){
            if(animeState.play) return;
            
            // check if direction is different from current animeDirection
            if(direction !== animeDirection){
                setAnimeDirection(direction);
                setAnimeState((prev)=>({
                    ...prev,
                    play: true,
                    pause: false
                }));
            }
        },
        events(eventState){
            setEvents(eventState);
        }
    }
}

// The useAnimeTimeline hook takes in three parameters: 
// `target`, `style`, and `config`. 
// It returns an object that contains the state of the animation (`animeState`) 
// and methods to control it (`playAnime` and `events`).
export function useAnimeTimeline(
    config:IAnimeConfig = {
        duration: 300,
        easing: "linear",
        delay: 0
    }
):IAnimeTimelineHook{
    // let [play, setPlay] = useState(false);
    
    // let [begin, setBegin] = useState(false);
    // let [completed, setCompleted] = useState(true);

    // let [initialMode, setInitialMode] = useState(true);
    // let [reverseMode, setReverseMode] = useState(false);

    let [animeDirection, setAnimeDirection] = useState<"normal"|"reverse">();
    let [animeExec, setAnimeExec] = useState(false);
    let [animeState, setAnimeState] = useState<IAnimeState>({
        play: false,
        pause: true,
        begin: false,
        completed: true,
        initialMode: true,
        reverseMode: false,
    });
    let [events, setEvents] = useState<IAnimeEvent>({});
    const animations = useRef([] as IStoredAnimations[]);
    

    useEffect(()=>{
        let { pause, initialMode, reverseMode } = animeState;
        // if the animation is paused or the animation is 
        // currently executing, return early.
        if(pause || animeExec) return;

        let animeConfig: AnimeParams = {
            ...config,
            autoplay: false,
            direction: animeDirection,
        };

        // If the anime is in the normal direction,
        // set up the animeConfig with the appropriate functions.
        if(animeDirection === "normal"){
            animeConfig.begin = ()=>{
                setAnimeExec(true);
                setAnimeState((prev)=> ({
                    ...prev,
                    begin: true,
                    completed: false
                }));
  
                if(events.onBegin) 
                    events.onBegin();
            };
            animeConfig.complete = ()=>{
                setAnimeExec(false);
                setAnimeState({
                    begin: false,
                    completed: true,
                    play: false,
                    pause: true,
                    initialMode: false,
                    reverseMode: true
                });
  
                if(events.onComplete) 
                    events.onComplete();
            }
        }

        // If the anime is in the reverse direction,
        // set up the animeConfig with the appropriate functions.
        if(animeDirection === "reverse"){
            animeConfig.begin = ()=>{
                setAnimeExec(true);
                setAnimeState((prev)=> ({
                    ...prev,
                    begin: true,
                    completed: false
                }));

                if(events.onReverseBegin) 
                    events.onReverseBegin();
            }
            animeConfig.complete = ()=>{
                setAnimeExec(false);
                setAnimeState((prev)=>({
                    ...prev,
                    play: false,
                    pause: true,
                    begin: false,
                    completed: true,
                    initialMode: true,
                    reverseMode: false
                }));

                if(events.onReverseComplete) 
                    events.onReverseComplete();
            }
        }

        let tl = anime.timeline(animeConfig);
        animations.current.forEach(({e, style, timelineOffset}:any)=>
            tl.add({targets: e, ...style}, timelineOffset));
        tl.play();

    }, [animeState, animeExec, animeDirection, events]);

    return {
        ...animeState,
        direction: animeDirection!,
        setDirection(value){
            setAnimeDirection(value);
        },
        // This function adds an animation to the current animations array
        addAnimation(element:AnimeTarget, style: IStyle, timelineOffset:number | string){
            // If the element is an array, we add the entire array to the animations
            if(element instanceof Array){
                return animations.current.push({e: element, style, timelineOffset});
            }

            // If the element doesn't have an id, we throw an error
            if(!element.id) 
                throw new Error("You must to provide an id for the element");
            
            // Otherwise, we check if the element already exists in the animations array
            let someElement = animations.current.some(({e})=>{
                // If we find an array element, we return false to indicate that we haven't found a match
                if(e instanceof Array) return false;

                // Otherwise, we check if the ids match
                return e.id === element.id
            });

            // If the element doesn't exist in the animations array, we add it
            if(!someElement) animations.current.push({e: element, style, timelineOffset});
        },
        playAnime(direction){
            // check if direction is different from current animeDirection
            if(direction !== animeDirection){
                setAnimeDirection(direction);
                setAnimeState((prev)=>({
                    ...prev,
                    play: true,
                    pause: false
                }));
            }
        },
        events(eventState){
            setEvents(eventState);
        }
    }
}

export function useAnimePage(pageRef:MutableRefObject<HTMLDivElement>, load:boolean, duration:number = 1000){
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(loadPageActions.setLoad(true));
    }, [])

    useEffect(()=>{
        if(!pageRef.current) return;

        if(load){
            anime({
                targets: pageRef.current,
                opacity: [0, 1],
                duration,
                easing: "easeInQuad"
            });
            return
        }

        anime({
            targets: pageRef.current,
            opacity: [1, 0],
            duration,
            easing: "linear"
        });
    }, [pageRef, load])
}