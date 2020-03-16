import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  A4: {
    height: 842,
    paddingLeft: 113,
    paddingRight: 75,
    paddingBottom: 75,
    paddingTop: 75
  },
  cover:{
    alignContent: 'center'
  },
  coverTitle:{
    fontSize: 20,
    margin: 15,
    fontWeight: 'bold'
  },
  coverContent:{
    fontSize: 18,
    
  },
  coverFooter:{
    fontSize: 18,
    fontWeight: 'inherit',
    float: 'right'
  }
});

export default function ControlledTreeView() {
  const classes = useStyles();
  
  return (
    <div className="Cover">
      <div className={classes.A4} >
        <div className={classes.coverTitle}>
          LỜI CÁM ƠN
        </div>  
        <div className={classes.coverContent}>
            Trong quá trình nghiên cứu đề tài, các giảng viên đã luôn hỗ trợ, hướng dẫn sinh
          viên. Với tất cả sự kính trọng, nhóm thực hiện đề tài xin được bày tỏ lòng biết ơn đến quý
          thầy cô đã luôn theo dõi và hướng dẫn trong suốt thời gian thực hiện đề tài.
          Đầu tiên, nhóm 1 xin gửi lời cảm ơn sâu sắc nhất đến Ban giám hiệu trường Đại học
          Sư phạm Kỹ Thuật Thành phố Hồ Chí Minh đã tạo điều kiện, môi trường học tập chất
          lượng, hiệu quả cho nhóm có thể phát huy một cách tốt nhất nghiên cứu.
          Đồng thời, nhóm xin gửi lời cảm ơn đến Ban Chủ nhiệm khoa Công nghệ Thông tin
          và các thầy cô khoa Công nghệ Thông tin - trường Đại học Sư phạm Kỹ thuật thành phố
          Hồ Chí Minh đã tạo môi trường học tập và làm việc chuyên nghiệp, nhiệt tình giảng dạy
          nhóm thực hiện đề tài nói riêng và sinh viên trong khoa Công nghệ Thông tin nói chung
          trong quá trình học tập và làm việc tại trường.
          Đặc biệt, xin gửi lời cảm ơn chân thành nhất đến thầy Nguyễn Minh Đạo – giáo
          viên hướng dẫn Tiểu luận chuyên ngành – Khoa công nghệ thông tin – Đại học Sư phạm
          Kỹ thuật Tp. Hồ Chí Minh, đã hướng dẫn, quan tâm, góp ý và luôn đồng đồng hành cùng
          nhóm trong những giai đoạn khó khăn nhất của đề tài
          Với những kinh nghiệm thực tiễn còn thiếu sót và kinh nghiệm chuyên môn còn non
          yếu, bài báo cáo vẫn có những thiếu sót và hạn chế nhất định. Kính mong nhận được những
          phản hỏi, đóng góp ý kiến và chỉ bảo thêm của quý thầy cô để nhóm có thể đạt được những
          kiến thức hữu ích nhất, nâng cao ý thức để phục vụ cho kỹ năng sau này.
        </div> 
        <div className={classes.coverFooter}>
          Xin chân thành cảm ơn!
        </div> 
      </div>
    </div>
  );
}