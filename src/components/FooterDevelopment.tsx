
const FooterDevelopment = () => {

  const currentYear = (new Date()).getFullYear();
  return (
    <footer className="w-screen h-auto bg-primary py-2">
      <div className="flex items-center justify-center text-white text-xs">
        <p>&copy; <span>{currentYear}</span> Bambucamp. Developed by{" "} 
          <a className="hover:text-tertiary hover:underline" href="https://www.digitalprocessit.com" target="_blank">DigitalProcessIT</a>.
        </p>
      </div>
    </footer>
  );
}

export default FooterDevelopment;
