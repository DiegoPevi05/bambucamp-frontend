
const FooterDevelopment = () => {

  const currentYear = (new Date()).getFullYear();
  return (
    <footer className="w-screen h-auto bg-primary py-2">
      <div className="flex items-center justify-center text-white text-[10px] sm:text-xs">
        <p>Developed by{" "} 
          <a className="hover:text-tertiary hover:underline" href="https://www.digitalprocessit.com" target="_blank">DigitalProcessIT</a>{" "}&copy; <span>{currentYear}</span> 
        </p>
      </div>
    </footer>
  );
}

export default FooterDevelopment;
