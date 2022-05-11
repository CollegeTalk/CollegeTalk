from api.models import db
from uuid import UUID

UUID_VERSION = 4


def validate_uuid4(uuid_string):
    """
    Validate that a UUID string is in
    fact a valid uuid4.
    Happily, the uuid module does the actual
    checking for us.
    It is vital that the 'version' kwarg be passed
    to the UUID() call, otherwise any 32-character
    hex string is considered valid.
    """

    try:
        val = UUID(uuid_string, version=UUID_VERSION)
    except ValueError:
        # If it's a value error, then the string
        # is not a valid hex code for a UUID.
        return False

    # If the uuid_string is a valid hex code,
    # but an invalid uuid4,
    # the UUID.__init__ will convert it to a
    # valid uuid4. This is bad for validation purposes.

    return val.hex == uuid_string.replace("-", "")


def update_fields(obj, data):
    """updater function for fields to use in PUT routes"""
    for key, value in data.items():
        if getattr(obj, key, None) != None:
            setattr(obj, key, value)


def update_relationship(model, user, data):
    """updater function for relationships to use in PUT routes"""
    for obj_id, obj_data in data["objs"].items():
        obj = db.session.query(model).filter_by(id=obj_id).first_or_404()
        field = getattr(obj, data["field"])

        if obj_data["function"] == "add":
            field.append(user)
        else:
            field.remove(user)

        update_fields(obj, obj_data)
