import React from 'react';
import './Repair.scss';
import { Container } from 'reactstrap';
import Contact from './Contact';
import ListImage from './ListImage';

const RepairWrapper: React.FC = () => {
  return (
    <div className="RepairWrapper">
      <Container>
        <h4 className="titleRepair"> SỬA CHỮA - KIỂM ĐỊNH - BẢO HÀNH</h4>
        <p>
          Trung tâm kiểm định thiết bị đo đạc của TRUNG TÂM TRẮC ĐỊA 3 có uy tín trên toàn Việt Nam, với trang thiết bị
          dùng để kiểm định hiệu chuẩn của nhà sản xuất chính hãng cung cấp, đặc biệt là các trang thiết bị này đã được
          liên kết chuẩn Quốc gia, Khu vực và Quốc tế. Mục tiêu của chúng tôi là chia sẻ thông tin với khách hàng, trả
          lời những câu hỏi của khách hàng và giải quyết những vấn đề kỹ thuật một cách nhanh chóng. Trung tâm trắc địa
          3 xin cam kết mang đến quý khách hàng dịch vụ bảo hành, kiểm định, sửa chữa
        </p>
        <p>“Chính hãng - Chuyên nghiệp - Thuận tiện” và Tiết kiệm tối đa thời gian của quý khách.</p>
        <ul>Dịch vụ hỗ trợ khách hàng:</ul>
        <li>Kiểm định - hiệu chuẩn máy lấy ngay</li>
        <li>Giao nhận máy kiểm đinh, sửa chữa tận nơi, miễn phí trong khu vực TP. HCM, Cần Thơ và các vùng lân cận</li>
        <li>
          Nếu thời gian sửa chữa nhiều hơn một tuần có thể hỗ trợ cho khách hàng mượn một máy với cấu hình tương đương
        </li>

        <p>Thời gian bảo hành từ 06 - 24 tháng (tùy theo sản phẩm, thiết bị, phụ kiện thay thế, sửa chữa)</p>
        <ul>Chúng tôi xin cam kết với khách hàng:</ul>
        <li>Dịch vụ tốt, chất lượng cao!</li>
        <li>Giá cạnh tranh!</li>
        <li>Đúng hẹn!</li>

        <h5 className="mt-4">
          Trung tâm trắc địa 3 luôn song hành cùng sự phát triển và hưng thịnh của quý khách hàng!
        </h5>
        <h4 className="red">“Dù bạn ở bất cứ nơi đâu- Thời gian nào”.</h4>
        <h5> Khi có nhu cầu hoặc cần bất cứ sự tư vấn nào xin đừng ngần ngại liên hệ với chúng tôi:</h5>
        <Contact />
        <h5 className="red">Hỗ trợ 24/24</h5>
        <ListImage />
      </Container>
    </div>
  );
};

export default RepairWrapper;
