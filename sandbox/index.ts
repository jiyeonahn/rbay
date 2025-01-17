import 'dotenv/config';
import { client } from '../src/services/redis';

const run = async () => {
    await client.hSet('car', {
        color: 'red',
        year: 1950,
        // engine: { cylinders: 8},
        // owner: null || '', 
        // service: undefined || '' 
    });
    // HSET car color red year 1950
    // 프로그래밍 언어에서 redis를 사용하는 경우 null을 넣을 수 없다.
    // null.toString() => error

    const car = await client.hGetAll('car');
    // if(!car){//동작x
    //     console.log('Car not fount, respond with 404');
    // }
    if(Object.keys(car).length == 0){
        console.log('Car not fount, respond with 404');
    }
    // HGETALL을 사용할 때는 존재하지 않는 키를 가져오려고 해도 항상 빈 오브젝트가 반환 됨
    console.log(car);
};
run();
