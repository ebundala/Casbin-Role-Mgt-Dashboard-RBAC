import React, { useEffect, useCallback } from 'react'
import axios from 'axios'
import Table from '../Table/Table'

import { useDispatch, useSelector } from 'react-redux'
import { addRoleList } from '../../store/actions'

const addRolesRow = async (newData) => {
    console.log(newData)
    await axios({
        method: 'post',
        url: 'http://localhost:2000/role',
        data: {
            uid: newData.v0,
            policyname: newData.v1,
        }
    })
}

const updateRolesRow = async (newData, oldData) => {
    await axios({
        method: 'put',
        url: `http://localhost:2000/policy/${oldData.id}`,
        data: {
            u_rid: newData.v1 ? newData.v1 : oldData.v1,
            policyname: newData.v0 ? newData.v0 : oldData.v0,
            action: newData.v2 ? newData.v2 : oldData.v2
        }
    })
}

const deleteRolesRow = async (oldData) => {
    await axios({
        method: 'delete',
        url: `http://localhost:2000/role/${oldData.id}`,
    })
}



const Roles = () => {
    const dispatch = useCallback(useDispatch(), [])
    const roleList = useSelector(state => state.roleList)
    const title = "List of Available Roles"
    const columns = [
        { title: 'ID (auto-generated)', field: 'id', editable: 'never' },
        // { title: 'PTYPE', field: 'ptype' },
        { title: 'V1 (Policy Name)', field: 'v1' },
        { title: 'V0 (UID)', field: 'v0' },
        { title: 'V2 (action)', field: 'v2' },
        { title: 'V3', field: 'v3' },
        { title: 'V4', field: 'v4' },
        { title: 'V5', field: 'v5' },
    ]

    useEffect(() => {
        (async () => {
            const result = await axios.get('http://localhost:2000/role')
            console.log(result)
            dispatch(addRoleList(result.data))
        })()
    }, [dispatch])

    return (
        <React.Fragment>
            {roleList ?
                <Table
                    addRow={addRolesRow}
                    updateRow={updateRolesRow}
                    deleteRow={deleteRolesRow}
                    title={title}
                    columns={columns}
                    bodyData={roleList}
                /> : null}
        </React.Fragment>
    )
}

export default Roles