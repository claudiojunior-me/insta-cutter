const AddFloatButton = require("./AddFloatButton")

// @ponicode
describe("componentDidMount", () => {
    let inst

    beforeEach(() => {
        inst = new AddFloatButton.default("Jean-Philippe")
    })

    test("0", () => {
        let callFunction = () => {
            inst.componentDidMount()
        }
    
        expect(callFunction).not.toThrow()
    })
})
