def update_fields(obj, data):
    '''updater function to use in PUT routes'''
    for key, value in data.items():
        setattr(obj, key, value)
