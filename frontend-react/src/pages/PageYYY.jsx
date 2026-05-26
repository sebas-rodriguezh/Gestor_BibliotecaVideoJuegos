import AsideMenu from '../components/AsideMenu';

const PageYYY = () => {
    return (
        <div style={{ display: 'flex' }}>
            <AsideMenu />

            <main style={{ padding: '2rem', flex: 1 }}>
                <h2>Página YYY</h2>
                <p>Esta es una ventana privada YYY.</p>
            </main>
        </div>
    );
};

export default PageYYY;