// Importe o useRouter do next/router
import { useRouter } from 'next/navigation';

const SeuComponente = () => {
  // Use o hook useRouter para acessar informações da rota, incluindo o locale
  const router = useRouter();
  const { locale } = router;
  console.log(locale)

  // Faça algo com o locale, como exibir ou usar em lógica de renderização
  return <p>O idioma atual é: {locale}</p>;
};

export default SeuComponente;
