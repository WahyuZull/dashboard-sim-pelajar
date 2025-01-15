export default function Table({ dataSource, columns }) {
    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra">
                <thead>
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index}>{column.title}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {dataSource.length === 0 && (
                        <tr>
                            <td
                                className="text-center py-6"
                                colSpan={columns.length}
                            >
                                Tidak ada data
                            </td>
                        </tr>
                    )}
                    {dataSource.map((data, index) => (
                        <tr key={index}>
                            {columns.map((column, index) => {
                                if (column.render) {
                                    return (
                                        <td key={index}>
                                            {column.render(
                                                data[column.dataIndex],
                                                index,
                                                data
                                            )}
                                        </td>
                                    );
                                }
                                return (
                                    <td key={index}>
                                        {typeof data[column.dataIndex] ===
                                            "object" ||
                                        Array.isArray(data[column.dataIndex])
                                            ? JSON.stringify(
                                                  data[column.dataIndex]
                                              )
                                            : data[column.dataIndex]}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
