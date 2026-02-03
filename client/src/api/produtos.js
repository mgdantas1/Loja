export async function GET(filter) {
    const params = new URLSearchParams();
    params.append('type', filter.type);
    params.append('status', filter.status);
    
    const URL = '/api/produto?' + params.toString();
    const response = await fetch(URL, { credentials: 'include' });
    const data = await response.json();
    return data;
}

export async function POST(produto) {
    const response = await fetch('/api/produto', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(produto),
    });
    const data = await response.json();
    return data;
}

export async function PUT(produto) {
    const response = await fetch(`/api/produto/${produto.id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(produto),
    });
    const data = await response.json();
    return data;
}

export async function DELETE(id) {
    const response = await fetch(`/api/produto/${id}`, {
        method: 'DELETE',
        credentials: 'include',
    });
    const data = await response.json();
    return data;
}

export async function PATCH(id) {
    const response = await fetch(`/api/produto/${id}/status`, {
        method: 'PATCH',
        credentials: 'include',
    });
    const data = await response.json();
    return data;
}
