import ReactCountryFlag from 'react-country-flag';

export default function ModalCountry({ country }: { country: string }) {
  return (
    <span
      title={country}
      className="flex items-center justify-center cursor-pointer rounded-full overflow-hidden h-8 w-8 hover:brightness-125"
    >
      <ReactCountryFlag className="pb-[3.5px] bg-red-50" countryCode={country} style={{ fontSize: 46 }} />
    </span>
  );
}
