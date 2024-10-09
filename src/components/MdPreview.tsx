import MarkdownPreview from '@uiw/react-markdown-preview';

export default function MdPreview({source}: {source: string}) {
  return (
    <div className=''>
      <MarkdownPreview source={source} style={{ padding: 16 }} className='p-3 rounded-lg'/>
    </div>
  )
}