import type { CreateItemAttrs } from '$services/types';

export const serialize = (attrs: CreateItemAttrs) => {
    return{
        ...attrs,
        createdAt: attrs.createdAt.toMillis(), //날짜를 객체가 아닌 밀리초로 변환
        endingAt: attrs.endingAt.toMillis()
    }
};
