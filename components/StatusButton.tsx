import { updateStatus } from '@/app/actions/action'
import Form from 'next/form'

const StatusButton = ({id}: {id: string}) => {
    const actions = updateStatus.bind(null, id)
    return (
        <Form action={actions}>
            <button className="bg-blue-500 px-4 text-white">Mark Resolved</button>
        </Form>
    )
}

export default StatusButton