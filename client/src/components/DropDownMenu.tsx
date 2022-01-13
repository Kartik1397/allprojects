import { ReactNode, useEffect, useState } from 'react';
import style from './DropDownMenu.module.css';

type props = {
    icon: ReactNode;
    menuItems: Array<ReactNode>;
};

const DropDownMenu = ({icon, menuItems}: props) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    useEffect(() => {
        if (isMenuOpen) {
            document.addEventListener('click', () => {
                setIsMenuOpen(false);
            }, { once: true })
        }
    }, [isMenuOpen]);
    return (
        <div className={style.DropDownMenu} onClick={e => e.stopPropagation()}>
            <div onClick={() => setIsMenuOpen(true)}>
                {icon}
            </div>
            {
                isMenuOpen
                && 
                    <div className={style.box}>
                        { menuItems }
                    </div>
            }
        </div>
    )
}

export default DropDownMenu;