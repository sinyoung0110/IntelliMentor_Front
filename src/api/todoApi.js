import jwAxios from '../util/jwUtil';
export const API_SERVER_HOST="http://localhost:8080"
const prefix=`${API_SERVER_HOST}/api/todo`

export const getOne=async(tno)=>{
    const res=await jwAxios.get(`${prefix}/${tno}`)

    return res.data
}

export const getList=async(pageParam)=>{
    const {page,size}=pageParam

    const res= await jwAxios.get(`${prefix}/list`,{params:{page,size}})

    return res.data

}

export const postAdd=async(todoObj)=>{
    const res=await jwAxios.post(`${prefix}/`,todoObj)

    return res.data
}

export const deleteOne=async (tno)=>{
    const res=await jwAxios.delete(`${prefix}/${tno}`)

    return res.data
}

export const putOne=async(todo)=>{
    const res=await jwAxios.put(`${prefix}/${todo.tno}`,todo)

    return res.data
}