import { cn } from "@/lib/utils";

const Header = () => {
    return (
        <header style={{ background: '#30A5FF', borderTopLeftRadius: 8, borderTopRightRadius: 8, padding: '24px 0', textAlign: 'center' }}>
            <h1
                style={{
                    fontSize: 32,
                    fontWeight: 'bold',
                    color: '#fff',
                    margin: 0,
                    lineHeight: 1.2,
                }}
            >chilangohacks</h1>
        </header>
    )
}

export default Header;