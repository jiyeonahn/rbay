import type { CreateItemAttrs } from '$services/types';
import { client } from '$services/redis'
import { serialize } from './serialize';
import { genId } from '$services/utils';
import { itemsKey } from '$services/keys';
import { deserialize } from './deserialize';

export const getItem = async (id: string) => {
    const item = await client.hGetAll(itemsKey(id));
    
    if(Object.keys(item).length === 0){
        return null;
    }

    return deserialize(id, item);
};

// 파이프라인 - 다양한 명령을 하나의 명령으로 만드는 것
// 100개의 요청을 100번 요청해야 하는 것을 1번의 요청으로 처리하기
export const getItems = async (ids: string[]) => {
    const commands = ids.map((id) => {
        return client.hGetAll(itemsKey(id));
    });

    const results = await Promise.all(commands);

    return results.map((result, i) => {
        if(Object.keys(result).length === 0){
            return null;
        }
        return deserialize(ids[i], result);
    });
    
};

export const createItem = async (attrs: CreateItemAttrs, userId: string) => {
    const id = genId();
    const serialized = serialize(attrs);

    await client.hSet(itemsKey(id), serialized);

    return id;
};
