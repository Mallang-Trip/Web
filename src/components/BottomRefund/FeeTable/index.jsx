function FeeTable() {
  return (
    <div>
      <div className="border rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 table-fixed">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="w-1/3 px-6 py-3 text-center">
                청약 철회 기간
                <br />
                (해당 일자의 23:59까지)
              </th>
              <th scope="col" className="w-1/3 px-6 py-3 text-center">
                위약금
              </th>
              <th scope="col" className="w-1/3 px-6 py-3 text-center">
                환급되는 금액
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 text-center">여행 8일 전날까지</td>
              <td className="px-6 py-4 text-center">없음</td>
              <td className="px-6 py-4 text-center">결제금액 전액</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-center">여행 7일 전날까지</td>
              <td className="px-6 py-4 text-center">결제금액의 10%</td>
              <td className="px-6 py-4 text-center">결제금액의 90%</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-center">여행 6일 전날까지</td>
              <td className="px-6 py-4 text-center">결제금액의 25%</td>
              <td className="px-6 py-4 text-center">결제금액의 75%</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-center">여행 5일 전날까지</td>
              <td className="px-6 py-4 text-center">결제금액의 50%</td>
              <td className="px-6 py-4 text-center">결제금액의 50%</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-center">여행 4일 전날까지</td>
              <td className="px-6 py-4 text-center">결제금액의 75%</td>
              <td className="px-6 py-4 text-center">결제금액의 25%</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-center">여행 3일 전날까지</td>
              <td className="px-6 py-4 text-center">결제금액의 90%</td>
              <td className="px-6 py-4 text-center">결제금액의 10%</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-center">여행 2일 전날까지</td>
              <td className="px-6 py-4 text-center">결제금액의 100%</td>
              <td className="px-6 py-4 text-center">없음</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-center">여행 1일 전날까지</td>
              <td className="px-6 py-4 text-center">결제금액의 100%</td>
              <td className="px-6 py-4 text-center">없음</td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-center">여행 당일</td>
              <td className="px-6 py-4 text-center">결제금액의 100%</td>
              <td className="px-6 py-4 text-center">없음</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-2.5">
        여행 2일 전날부터는 위약금이 결제금액의 100%이므로 예약 취소가
        불가능합니다.
      </p>
    </div>
  );
}

export default FeeTable;
