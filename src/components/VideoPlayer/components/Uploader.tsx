import IStreamUploader from '@/types/StreamUploader';

interface IUploaderProps {
  data: IStreamUploader | null;
}

export default function Uploader({ data }: IUploaderProps) {
  if (!data) return <></>;

  return (
    <div>
      <h1>Uploader</h1>
      <span>{data?.uploader}</span>
      <span>{data?.uploaderVerified ? 'Verified' : 'Not Verified'}</span>
    </div>
  );
}
