import { post, baseUri } from '@/utils/http';

export const findPage = data => {
    return post(baseUri('/admin/v6_0_0/template/findPage'), data);
};

export const findById = data => {
    return post(baseUri('/admin/v6_0_0/template/findById'), data);
};

export const saveItem = data => {
    return post(baseUri('/admin/v6_0_0/template/save'), data);
};

export const updateItem = data => {
    return post(baseUri('/admin/v6_0_0/template/update'), data);
};

export const deleteItem = data => {
    return post(baseUri('/admin/v6_0_0/template/delete'), data);
};

export const templateContent = data => {
    return post(baseUri('/admin/v6_0_0/template/content'), data);
};
