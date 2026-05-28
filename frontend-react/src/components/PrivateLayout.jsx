import AsideMenu from './AsideMenu';
import Navbar from './Navbar';
import Footer from './Footer';

function PrivateLayout({ children }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />

            <div style={{ display: 'flex', flex: 1 }}>
                <AsideMenu />

                <section style={{
                    flex: 1,
                    padding: '30px',
                    backgroundColor: '#f4f6f8',
                    overflowY: 'auto'
                }}>
                    {children}
                </section>
            </div>

            <Footer />
        </div>
    );
}

export default PrivateLayout;