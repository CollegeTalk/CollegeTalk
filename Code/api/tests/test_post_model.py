from uuid import uuid4

from api.models import PostModel, SubgroupModel, db


def _post_generator():
    # TODO: mock uuids and time
    test_author_id = uuid4()
    test_title = "how is cs425 entrepreneurship?"
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

    return test_author_id, test_title, test_post_body, subgroup_uuid


def _clear_post_tables():
    db.session.query(PostModel).delete()
    db.session.query(SubgroupModel).delete()
    db.session.commit()


def test_get_posts_all(client):
    rs = client.get("/posts")

    assert rs.status_code == 200
    data = rs.json
    assert len(data) == 0

    test_author_id, test_title, test_post_body, subgroup_uuid = _post_generator()

    new_post = PostModel(
        author_id=test_author_id,
        title=test_title,
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

    _clear_post_tables()


def test_get_posts_limit(client):
    rs = client.get("/posts")

    assert rs.status_code == 200
    data = rs.json
    assert len(data) == 0

    test_author_id, test_title, test_post_body, subgroup_uuid = _post_generator()

    new_post = PostModel(
        author_id=test_author_id,
        title=test_title,
        body=test_post_body,
        subgroup_id=subgroup_uuid,
    )
    db.session.add(new_post)
    db.session.commit()

    rs = client.get("/posts?limit=1")
    assert rs.status_code == 200
    data = rs.json
    assert len(data) == 1

    test_author_id, test_title, test_post_body, subgroup_uuid = _post_generator()
    new_post = PostModel(
        author_id=test_author_id,
        title=test_title,
        body=test_post_body,
        subgroup_id=subgroup_uuid,
    )
    db.session.add(new_post)
    db.session.commit()

    rs = client.get("/posts?limit=2")
    assert rs.status_code == 200
    data = rs.json
    assert len(data) == 2

    rs = client.get("/posts?limit=1")
    assert rs.status_code == 200
    data = rs.json
    assert len(data) == 1

    rs = client.get("/posts?limit=-1")
    assert rs.status_code == 200
    data = rs.json
    assert len(data) == 2

    _clear_post_tables()


def test_post_post(client):

    post = db.session.query(PostModel).first()

    assert post == None

    test_author_id, test_title, test_post_body, subgroup_uuid = _post_generator()

    client.post(
        "/posts",
        json=dict(
            author_id=test_author_id,
            title=test_title,
            body=test_post_body,
            subgroup_id=subgroup_uuid,
        ),
    )

    post = db.session.query(PostModel).one_or_none()

    assert not post == None
    assert post.author_id == test_author_id
    assert post.title == "how is cs425 entrepreneurship?"
    assert post.body == test_post_body
    assert post.subgroup_id == subgroup_uuid

    _clear_post_tables()


def test_get_post(client):
    rs = client.get("/posts")

    assert rs.status_code == 200
    data = rs.json
    assert len(data) == 0

    test_author_id, test_title, test_post_body, subgroup_uuid = _post_generator()
    new_post = PostModel(
        author_id=test_author_id,
        title=test_title,
        body=test_post_body,
        subgroup_id=subgroup_uuid,
    )
    db.session.add(new_post)
    db.session.commit()

    post_id = new_post.id

    rs = client.get(f"/posts/{post_id}")

    assert rs.status_code == 200
    data = rs.json
    assert data["author_id"] == str(test_author_id)
    assert data["title"] == test_title
    assert data["body"] == test_post_body
    assert data["num_upvotes"] == 0
    assert data["subgroup_id"] == str(subgroup_uuid)

    _clear_post_tables()


def test_put_post(client):
    rs = client.get("/posts")

    assert rs.status_code == 200
    data = rs.json
    assert len(data) == 0

    test_author_id, test_title, test_post_body, subgroup_uuid = _post_generator()
    new_post = PostModel(
        author_id=test_author_id,
        title=test_title,
        body=test_post_body,
        subgroup_id=subgroup_uuid,
    )
    db.session.add(new_post)
    db.session.commit()

    post = db.session.query(PostModel).one_or_none()
    assert not post == None
    assert post.author_id == test_author_id
    assert post.title == test_title
    assert post.body == test_post_body
    assert post.subgroup_id == subgroup_uuid

    post_id = new_post.id

    rs = client.put(
        f"/posts/{post_id}",
        json=dict(
            author_id=test_author_id,
            title="What is computer science?",
            body="Tell me what it is.",
            subgroup_id=subgroup_uuid,
        ),
    )

    assert rs.status_code == 200

    post = db.session.query(PostModel).one_or_none()
    assert not post == None
    assert post.author_id == test_author_id
    assert post.title == "What is computer science?"
    assert post.body == "Tell me what it is."
    assert post.subgroup_id == subgroup_uuid

    _clear_post_tables()


def test_post_post_invalid_fields(client):
    # TODO: test invalid fields
    pass


def test_get_nonexistent_post(client):
    # TODO: test nonexistent post
    pass


def test_put_post_invalid_fields(client):
    # TODO: test invalid fields
    pass
