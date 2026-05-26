import AsideMenu from './AsideMenu';

function PrivateLayout({ children }) {
    return (
        <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
            <AsideMenu />

            <section style={{ flex: 1, padding: '30px', backgroundColor: '#f4f6f8', overflowY: 'auto' }}>
                {children}
            </section>
        </div>
    );
}

export default PrivateLayout;