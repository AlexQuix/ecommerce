import { matchNumber } from "../index";

describe("matchNumber - retrieve the number in string", ()=>{    
    test("should return 0 if there is not number in string, otherwise should return number", ()=>{
        expect(matchNumber("holasfa")).toBe(0);
        expect(matchNumber("12323")).toBe(12323);
        expect(matchNumber("12 323")).toBe(12);
        expect(matchNumber(" 3 ")).toBe(3);
        expect(matchNumber(" 3px ")).toBe(3);
        expect(matchNumber("3 ")).toBe(3);
        expect(matchNumber("3.12 ")).toBe(3);
        expect(matchNumber("3  . 23")).toBe(3);
    })
    test("should return decimal number, otherwise should return 0", ()=>{
        expect(matchNumber("px", true)).toBe(0);
        expect(matchNumber("3.23", true)).toBe(3.23);
        expect(matchNumber("3.px", true)).toBe(3);
        expect(matchNumber("3.2px", true)).toBe(3.2);
        expect(matchNumber("3..2px", true)).toBe(3);
    })
})