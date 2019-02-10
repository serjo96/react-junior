import React from 'react';
import { Table } from 'react-bootstrap';
import {Link} from "react-router-dom";


const InvoicesTable = (data) => {
    if(data.list.length === 0){
        return(
            <div>Invoices list is empty</div>
        )
    }
    return(
        <Table striped hover>
            <thead>
            <tr>
                <th>#</th>
                <th>customer</th>
                <th>discount</th>
                <th>total</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {data.list.map((el,i)=>
                <tr key={i}>
                    <td>{i+1}</td>
                    <td>{el.customerName}</td>
                    <td>{el.discount}</td>
                    <td>{el.total}</td>
                    <td>
                        <Link to={{
                            pathname: `/invoices/${el.id}/edit`,
                            state: {
                                id: el.id,
                                CustomerOption: { value: el.customer_id, label: el.customerName},
                                discount: el.discount
                            }
                        }}>
                            <button>Edit</button>
                        </Link>

                        <button onClick={()=>data.showDeleteModal(el.id)}>Delete</button>
                    </td>
                </tr>
            )}

            </tbody>
        </Table>
    )
};

export default InvoicesTable;
