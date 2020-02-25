import React, {Component} from 'react';
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import data from './data'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class App extends Component {
    state = {
        felial: '',
        startDate: new Date(),
        doctor: '',
        type: ''
    };

    change = (e) => {
        const {name, value} = e.target;
        this.setState({[name]: value})
    };

    handleChange = date => {
        this.setState({
            startDate: date
        });
    };

    render() {

        const felial = this.state.felial;
        //Вывод фелиалов чеерез mep
        let FelialItem = data.felials.map(d => <option key={d.id} value={d.id}>{d.name} </option>);
        let DocItem;
        //Вывод докторов чеерез mep с условием что выбран фелиал
        felial ? DocItem = data.felials[felial].doctors.map(d => <option key={d.id}
                                                                         value={d.name}>{d.name} </option>) : DocItem = '';
        let felials;
        //Переменной присваевается jsx при условии что выбран фелиал
        if (felial) {
            felials = <>
                <Form.Group controlId="exampleForm.ControlSelect3">
                    <Form.Label>Врач</Form.Label>
                    <Form.Control as="select" name="doctor" onChange={this.change}>
                        {DocItem}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect4">
                    <Form.Label>Дата приема</Form.Label>
                    <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleChange}
                        minDate={new Date()}
                        maxDate={new Date().setDate(new Date().getDate() + 7)}
                    />
                </Form.Group>
            </>;
        } else {
            felials = '';
        }
        return (
            <div className="App">
                <div className="App-header">
                    <div className="form">
                        <Form>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>Тип записи</Form.Label>
                                <Form.Control as="select" name='type' onChange={this.change}>
                                    <option value='first'>Первичная</option>
                                    <option value='repeat'>Повторная</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlSelect2">
                                <Form.Label>Фелиал</Form.Label>
                                <Form.Control as="select" name='felial' value={felial} onChange={this.change}>
                                    <option value=''>Выберите фелиал</option>
                                    {FelialItem}
                                </Form.Control>
                            </Form.Group>
                            {felials}
                        </Form>
                    </div>
                </div>
            </div>
        );


    }

    componentDidUpdate() {
        console.log(this.state)
    }
}


export default App;
