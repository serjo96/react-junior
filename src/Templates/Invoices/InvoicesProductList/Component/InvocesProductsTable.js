import React from 'react';
import { Table } from 'react-bootstrap';



const InvoicesProductsTable = (data) => {
    return(
        <Table striped hover>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {data.list.map((el,i)=>
                    <tr key={i}>
                        <td>{el.name}</td>
                            <td>{el.price}</td>
                            <td>
                                <input
                                    min="1"
                                    defaultValue={el.quantity ? el.quantity : 1}
                                    onChange={e=>
                                        data.onChangeQuantity({
                                            product_id: el.product_id,
                                            id: el.id, quantity: e.target.value},
                                            data.location.state.id
                                        )}
                                    type="number"
                                />
                            </td>
                            <td>
                                <button onClick={()=>data.deleteProduct(el.id, data.location.state.id)}>delete</button>
                            </td>
                        </tr>
                    )}

                    </tbody>
                </Table>
            )
};



export default InvoicesProductsTable;
