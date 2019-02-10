import React from 'react';
import { Table } from 'react-bootstrap';


const ProductsTable = (data) => {
    if(data.isFetching){
        if(data.list.length === 0){
            return(
                <div>Products list is empty</div>
            )
        }
        return(
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {data.list.map((el,i)=>
                    <tr key={i}>
                        <td>{i+1}</td>
                        <td>{el.name}</td>
                        <td>{el.price}</td>
                        <td>
                            <button onClick={()=>data.showEditModal({
                                name: el.name,
                                price: el.price,
                                id: el.id
                            })}>Edit</button>
                            <button onClick={()=>data.showDeleteModal(el.id, el.name)}>Delete</button>
                        </td>
                    </tr>
                )}

                </tbody>
            </Table>
        )
    }

    return (<div>loading...</div>);

};

export default ProductsTable;
