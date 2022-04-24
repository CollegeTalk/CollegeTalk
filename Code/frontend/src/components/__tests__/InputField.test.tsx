import renderer from "react-test-renderer";

import InputField from "../CreatePost/InputField";

describe("<CreatePostTitle />", () => {
    it("has 1 child", () => {
        const tree = renderer
            .create(
                <InputField
                    placeholder=""
                    setText={() => null}
                    isLarge={false}
                />
            )
            .toJSON() as renderer.ReactTestRendererJSON;
        expect(tree.children!.length).toBe(1);
    });

    it("renders correctly", () => {
        const tree = renderer
            .create(
                <InputField
                    placeholder=""
                    setText={() => null}
                    isLarge={false}
                />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
