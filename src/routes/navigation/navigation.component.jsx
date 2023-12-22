import { Fragment, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { ReactComponent as CrwnLogo} from '../../assets/crown.svg';
import { NavigationContainer, NavLink, NavLinks, LogoContainer } from './navigation.style';
import { UserContext } from '../../context/user.context';
import { signOutUser } from '../../utility/firebase/firebsa.utils';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CardDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { CartContext,  } from '../../context/cart.context';
const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <CrwnLogo />
                </LogoContainer>
                <NavLinks>
                    <NavLink to='/shop'>SHOP</NavLink>
                    {currentUser ? (
                        <NavLink as='span' onClick={signOutUser}>
                            SIGN OUT
                        </NavLink>
                    ) : (
                        <NavLink to='/auth'>SIGN IN</NavLink>
                    )}
                    <CartIcon />
                </NavLinks>
                {isCartOpen && <CardDropdown />}
            </NavigationContainer>
            <Outlet />
        </Fragment>
    );
};

export default Navigation;