export interface BaseResponse<T>{

    isSucces: false,
    data: T,
    mensaje: string,
    innerExeption: any
}
