
interface GenericTableProps {
    entity: string
  }


const GenericTable = ({entity}:GenericTableProps) => {
  return (
    <div>
      {entity} + this is the right way
    </div>
  )
}

export default GenericTable
