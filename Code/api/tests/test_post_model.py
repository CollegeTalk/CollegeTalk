from uuid import uuid4

from api.models import PostModel, SubgroupModel, db
from freezegun import freeze_time


@freeze_time("2022-02-22")
def test_get_posts(client):
    rs = client.get("/posts")

    assert rs.status_code == 200
    data = rs.json
    assert len(data) == 0

    # TODO: mock uuids
    test_author_id = uuid4()

    test_post_body = (
        "I am about to choose classes for next semester,"
        "and saw CS425 Entrepreneurship in CS taught by Professor Kemper that "
        "fulfills the COLL 400 requirement. "
        "How is this class and what should I know about it?"
    )

    test_subgroup = SubgroupModel(
        name="Computer Science (W&M)",
        description="Computer Science at William & Mary",
    )
    db.session.add(test_subgroup)
    db.session.commit()
    subgroup_uuid = db.session.query(SubgroupModel).first().id

    new_post = PostModel(
        author_id=test_author_id,
        title="how is cs425 entrepreneurship?",
        body=test_post_body,
        subgroup_id=subgroup_uuid,
    )
    db.session.add(new_post)
    db.session.commit()

    rs = client.get("/posts")
    assert rs.status_code == 200
    data = rs.json
    assert len(data) == 1

    assert data[0]["author_id"] == str(test_author_id)
    assert data[0]["title"] == "how is cs425 entrepreneurship?"
    assert data[0]["body"] == test_post_body
    assert data[0]["num_upvotes"] == 0
    assert data[0]["subgroup_id"] == str(subgroup_uuid)
