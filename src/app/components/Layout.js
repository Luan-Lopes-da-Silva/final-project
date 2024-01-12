import { useRouter } from 'next/navigation';

const Layout = ({ children }) => {
  const router = useRouter();
  const { locale } = router;

  return (
    <div>
      <p>Idioma atual: {locale}</p>
      {children}
    </div>
  );
};

export default Layout;
