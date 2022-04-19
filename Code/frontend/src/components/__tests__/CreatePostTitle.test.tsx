import renderer from "react-test-renderer";

import CreatePostTitle from "../CreatePost/InputField";

describe("<CreatePostTitle />", () => {
    it("has 1 child", () => {
        const tree = renderer
            .create(<CreatePostTitle text="" setTitleText={() => null} />)
            .toJSON() as renderer.ReactTestRendererJSON;
        expect(tree.children!.length).toBe(1);
    });

    it("renders correctly", () => {
        const tree = renderer
            .create(<CreatePostTitle text="" setTitleText={() => null} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
