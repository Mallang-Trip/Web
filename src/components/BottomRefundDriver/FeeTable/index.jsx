function FeeTable() {
  return (
    <div className="border rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200 table-fixed">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="w-1/3 px-6 py-3 text-center">
              계약 취소 기간
              <br />
              (해당 일자의 23:59까지)
            </th>
            <th scope="col" className="w-2/3 px-6 py-3 text-center">
              위약금
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          <tr>
            <td className="px-6 py-4 text-center">여행 8일 전날까지</td>
            <td className="px-6 py-4 text-center">없음</td>
          </tr>
          <tr>
            <td className="px-6 py-4 text-center">여행 7일 전날까지</td>
            <td className="px-6 py-4 text-center">
              드라이브 서비스 대금 전액의 5%
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 text-center">여행 6일 전날까지</td>
            <td className="px-6 py-4 text-center">
              드라이브 서비스 대금 전액의 10%
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 text-center">여행 5일 전날까지</td>
            <td className="px-6 py-4 text-center">
              드라이브 서비스 대금 전액의 15%
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 text-center">여행 4일 전날까지</td>
            <td className="px-6 py-4 text-center">
              드라이브 서비스 대금 전액의 20%
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 text-center">여행 3일 전날까지</td>
            <td className="px-6 py-4 text-center">
              드라이브 서비스 대금 전액의 25%
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 text-center">여행 2일 전날까지</td>
            <td className="px-6 py-4 text-center">
              드라이브 서비스 대금 전액의 30%
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 text-center">여행 1일 전날까지</td>
            <td className="px-6 py-4 text-center">
              드라이브 서비스 대금 전액의 35%
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 text-center">여행 당일</td>
            <td className="px-6 py-4 text-center">
              드라이브 서비스 대금 전액의 40%
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default FeeTable;
