import Header from './auth/template/Header';
import MenuDashboard from './auth/template/MenuDashboard';
import Footer from './auth/template/Footer';

function Main() {
  return (
    <div class="wrapper">
      <Header/>      
      <MenuDashboard/>
      <Footer/>
    </div>
  );
}

export default Main;