export let langCode = 'ko';
export function set_langCode(object) {
    langCode = object;
}
/**
 * @param c0 정상
 * @param c1_0001 jwt token이 잘못됨
 *

 *
 * @param c9999_9999 서버 에러
 */
export const cCodes = {
    c0: 'c0',
    c1_0001: 'c1_0001',
    c9999_9999: 'c9999_9999',
};
export const errorCode = {
    [cCodes.c0]: {
        en: '',
        ko: '',
    },
    [cCodes.c1_0001]: {
        en: 'invalid jwt token',
        ko: '잘못된 토큰입니다.',
    },
    [cCodes.c9999_9999]: {
        en: 'server error',
        ko: '서버 에러',
    },
};
//# sourceMappingURL=error_code.js.map