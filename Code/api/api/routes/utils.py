def update_fields(obj, data):
    """updater function for fields to use in PUT routes"""
    for key, value in data.items():
        setattr(obj, key, value)
