import React from "react";
import Modal from "react-modal";
import styles from "../shopApp.module.css";
import { Form } from "./form";
import { FaTimes } from "react-icons/fa";

interface IAddProductProps {
    isOpen: boolean;
    onSubmit: (payload: { title: string; description: string; price: string }) => void;
}

export default class AddProductModal extends React.Component<IAddProductProps, {}> {

    render() {

        return <>
            <Modal isOpen={this.props.isOpen} className={styles.reactModalContent} overlayClassName={styles.reactModalOverlay}>
                <div className={styles.modalContentHelper}>
                <div className={styles.modalClose} onClick={function (this: any) {
            this.setState({
                isOpen: false
            });
            }.bind(this)}><FaTimes /></div>

                <Form onSubmit={this.props.onSubmit} />
                </div>
            </Modal>
        </>;
    }
}