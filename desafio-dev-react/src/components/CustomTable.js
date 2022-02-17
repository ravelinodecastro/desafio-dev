import React from 'react';
import axios from 'axios'
import ReactPaginate from 'react-paginate';
axios.defaults.baseURL = `${process.env.REACT_APP_API_URL}/api`
class CustomTable extends React.Component {
    state = {
        data: [],
        pagination: {
            page: 1
        }
    }
    async getData() {
        await axios
            .get('/transactions', {
                params: { page: this.state.pagination.current_page },
            })
            .then(({ data }) => {
                this.setState({
                    data: data.data,
                    pagination: data.meta
                })
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => { })
    }

    formatDate(input) {
        if (input) {
            let datePart = input.match(/\d+/g),
                year = datePart[0].substring(0),
                month = datePart[1],
                day = datePart[2]

            return `${day}/${month}/${year}`
        }
    }
    formatHour(input) {
        if (input) {
            let datePart = input.match(/\d+/g),
                hour = datePart[3],
                min = datePart[4],
                s = datePart[5]

            return `${hour}:${min}:${s}`
        }
    }

    componentDidMount() {
        this.getData()
    }
    render() {
        return (
            <div className="container">
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Data</th>
                            <th>Hora</th>
                            <th>Descrição</th>
                            <th>Valor</th>
                            <th>CPF</th>
                            <th>Cartão</th>
                            <th>Dono da Loja</th>
                            <th>Nome do Dono</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            !this.state.data.length && <tr>
                                <td colSpan="10">Sem transações carregadas...</td>
                            </tr>
                        }
                        {
                            this.state.data.map((item, idx) => <tr key={idx}>
                                <td>{item.id}</td>
                                <td>{this.formatDate(item.processed_at)}</td>
                                <td>{this.formatHour(item.processed_at)}</td>
                                <td>{item.description}</td>
                                <td>{item.amount} R$</td>
                                <td>{item.recipient.cpf}</td>
                                <td>{item.recipient.card}</td>
                                <td>{item.store.owner_name}</td>
                                <td>{item.store.name}</td>
                                <td>{item.store.amount} R$</td>
                            </tr>)
                        }


                    </tbody>
                </table>
                <nav aria-label="Page navigation">
                    {(this.state.pagination.total > this.state.pagination.current_page * this.state.pagination.per_page ||
                        this.state.pagination.current_page != 1) && <ReactPaginate

                            pageCount={Math.ceil(this.state.pagination.total / this.state.pagination.per_page)}
                            pageRangeDisplayed={this.state.pagination.per_page}
                            // onClick={this.getData.bind(this)}
                            onPageChange={(e) => {
                                //this.setState({ pagination: { ...this.state.pagination, current_page: e.selected+1}})
                                let pagination = this.state.pagination
                                pagination.current_page = e.selected + 1
                                this.setState({ pagination })
                                this.getData()
                            }}

                            previousLabel="Anterior"
                            nextLabel="Próximo"
                            containerClassName="pagination justify-content-end mt-3"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                        />}

                </nav>
            </div >
        )
    }
}
export default CustomTable;