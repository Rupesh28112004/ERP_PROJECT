interface Column {
  header: string;
  accessor: string;
}

interface TableProps {
  columns: Column[];
  data: any[];
  onEdit?: (item: any) => void;
  onDelete?: (id: number) => void;
  role?: string;
}

export default function Table({ columns, data, onEdit, onDelete, role }: TableProps) {
  const visibleColumns = role === "user"
    ? columns.filter(col => col.header !== "ACTIONS")
    : columns;

  const showActions = role !== "user" && (onEdit || onDelete);

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-100">
      <table className="min-w-full text-sm">

        {/* HEADER */}
        <thead>
          <tr className="bg-gray-100/60 backdrop-blur-xl border-b border-gray-200">
            {visibleColumns.map((column, index) => (
              <th
                key={index}
                className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-600"
              >
                {column.header}
              </th>
            ))}

            {showActions && (
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                Actions
              </th>
            )}
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {data.map((item, rowIndex) => (
            <tr
              key={rowIndex}
              className="hover:bg-gray-50 transition-all border-b border-gray-200"
            >
              {visibleColumns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className="px-6 py-4 text-gray-800 whitespace-nowrap"
                >
                  {item[column.accessor]}
                </td>
              ))}

              {showActions && (
                <td className="px-6 py-4 flex items-center gap-3">
                  
                  {onEdit && (
                    <button
                      onClick={() => onEdit(item)}
                      className="px-3 py-1 text-blue-600 border border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-all"
                    >
                      Edit
                    </button>
                  )}

                  {onDelete && (
                    <button
                      onClick={() => onDelete(item.id)}
                      className="px-3 py-1 text-red-600 border border-red-600 rounded-full hover:bg-red-600 hover:text-white transition-all"
                    >
                      Delete
                    </button>
                  )}

                </td>
              )}
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}
