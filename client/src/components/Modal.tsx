import { FC, ReactNode } from 'react';
import style from './Modal.module.css';

type ModalProps = {
    children?: ReactNode
};

const Modal:FC = ({ children }: ModalProps) => {
    return (
        <div className={style.Modal}>
            <div className={style.Box}>
                { children }
            </div>
        </div>
    );
};

export default Modal;