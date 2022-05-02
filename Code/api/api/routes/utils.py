from api.models import db


def update_fields(obj, data):
    """updater function for fields to use in PUT routes"""
    for key, value in data.items():
        if getattr(obj, key, None) != None:
            setattr(obj, key, value)


def update_relationship(model, user, data):
    """updater function for relationships to use in PUT routes"""
    for obj_id, obj_data in data["objs"].items():
        print(obj_id)
        obj = db.session.query(model).filter_by(id=obj_id).first_or_404()
        field = getattr(obj, data["field"])

        if obj_data["function"] == "add":
            field.append(user)
        else:
            field.remove(user)

        update_fields(obj, obj_data)
