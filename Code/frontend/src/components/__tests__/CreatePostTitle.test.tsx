import renderer from "react-test-renderer";

import CreatePostTitle from "../CreatePost/CreatePostTitle";

describe("<CreatePostTitle />", () => {
    it("has 1 child", () => {
        const tree = renderer
            .create(<CreatePostTitle titleText="" setTitleText={() => null} />)
            .toJSON() as renderer.ReactTestRendererJSON;
        expect(tree.children!.length).toBe(1);
    });

    it("renders correctly", () => {
        const tree = renderer
            .create(<CreatePostTitle titleText="" setTitleText={() => null} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
