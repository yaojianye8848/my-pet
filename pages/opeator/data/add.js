import React, {useState} from "react";
import styles from "../../../styles/Home.module.css";
import Head from "next/head";
import NavBarInstance from "../../../component/NavbarInstance";
import callContract from "../../../hooks/call-contract";
import {Form, Schema} from 'rsuite';
import RadioGroup from "rsuite/RadioGroup";
import Radio from "rsuite/Radio";
import Cascader from "rsuite/Cascader";
import DatePicker from "rsuite/DatePicker";
import {StringType} from "schema-typed";
import ButtonToolbar from "rsuite/ButtonToolbar";
import Button from "rsuite/Button";

const model = Schema.Model({
    name: StringType().isRequired('This field is required.'),
    gendor: StringType().isRequired('This field is required.'),
    location: StringType().isRequired('This field is required.'),
    owner: StringType().isRequired('This field is required.'),
    birthday: StringType().isRequired('This field is required.'),
    noseLines: StringType().isRequired('This field is required.'),
    pictureHash: StringType().isRequired('This field is required.'),
});

const OpeatorDataAdd = () => {

    const {handleSetOpeatorData} = callContract();

    const [activeKey, setActiveKey] = useState(null);
    const cascaderData = process.env.LOCATIONS;

    const formRef = React.useRef();
    const [formError, setFormError] = React.useState({});
    const [formValue, setFormValue] = React.useState({
        name: '',
        location: '',
        address: '',
    });

    const handleSubmit = async (event) => {
        console.log(formValue, 'Form Value');

        const name = formValue.name;
        const location = formValue.location;
        const address = formValue.address;

        const accounts = await ethereum.request({method: 'eth_requestAccounts'});
        const account = accounts[0];

        await handleSetOpeatorData(account, address, name, location);
    };

    return (
        <div className={styles.layout}>

            <Head>
                <title>组织认证</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <NavBarInstance appearance="subtle" activeKey={activeKey} onSelect={setActiveKey}/>

            <main className={styles.container}>

                <Form
                    ref={formRef}
                    onChange={setFormValue}
                    onCheck={setFormError}
                    formValue={formValue}
                    model={model}>

                    <Form.Group controlId="input">
                        <Form.ControlLabel>姓名</Form.ControlLabel>
                        <Form.Control name="name"/>
                        <Form.HelpText tooltip>请输入宠物姓名</Form.HelpText>
                    </Form.Group>

                    <Form.Group controlId="cascader">
                        <Form.ControlLabel>地点:</Form.ControlLabel>
                        <Form.Control name="location" accepter={Cascader} data={cascaderData} />
                    </Form.Group>

                    <Form.Group controlId="input">
                        <Form.ControlLabel>账户</Form.ControlLabel>
                        <Form.Control name="address"/>
                        <Form.HelpText tooltip>请输入所有人账户地址</Form.HelpText>
                    </Form.Group>

                    <ButtonToolbar>
                        <Button appearance="primary" onClick={handleSubmit}>
                            认证
                        </Button>
                    </ButtonToolbar>
                </Form>

            </main>

        </div>
    )
};

export default OpeatorDataAdd;