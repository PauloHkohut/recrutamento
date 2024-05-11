'use client';

import { useFormStatus } from 'react-dom';

export function SubmitButton({ rotulo }: { rotulo: string }) {
    const { pending } = useFormStatus();

    return (
        <button type="submit" className="btn btn-success" disabled={pending}>
            {rotulo}
        </button>
    );
}
