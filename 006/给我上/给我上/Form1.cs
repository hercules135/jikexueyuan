using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;
using myClassLibrary;
using System.Speech.Synthesis;

namespace 给我上
{
    public partial class Form1 : Form
    {
        DataTable tblDatas = new DataTable();
        bool isOn = false;
        Thread thread;
        Thread thread2;
        List<xyc> attacklist = new List<xyc>();
        
        public Form1()
        {
            InitializeComponent();

            myClassLibrary.helper.HotKey.RegisterHotKey(Handle, 100, myClassLibrary.helper.HotKey.KeyModifiers.Shift, Keys.S);
            myClassLibrary.helper.HotKey.RegisterHotKey(Handle, 101, myClassLibrary.helper.HotKey.KeyModifiers.Shift, Keys.D);

            this.openFileDialog1.InitialDirectory = Application.StartupPath;
            this.saveFileDialog1.InitialDirectory = Application.StartupPath;
            openFileDialog1.Filter = "txt files (*.txt)|*.txt|All files (*.*)|*.*";
            saveFileDialog1.Filter = "txt files (*.txt)|*.txt|All files (*.*)|*.*";

            tblDatas.Columns.Add("x坐标");
            tblDatas.Columns.Add("y坐标");
            tblDatas.Columns.Add("颜色");
            tblDatas.Columns.Add("keycode");
            tblDatas.Columns.Add("按键");
            tblDatas.Columns.Add("group");

            dataGridView1.DataSource = tblDatas;
        }

        private void openFileDialog1_FileOk(object sender, CancelEventArgs e)
        {

        }

        /// <summary>
        /// 打开配置 导入json
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void button1_Click(object sender, EventArgs e)
        {
            if(this.openFileDialog1.ShowDialog()== DialogResult.OK)
            {
                System.IO.StreamReader sr = new System.IO.StreamReader(openFileDialog1.FileName);
                List<xyc> list = JsonConvert.DeserializeObject<List<xyc>>(sr.ReadToEnd());
                sr.Close();

                tblDatas = new DataTable();
                tblDatas.Columns.Add("x坐标");
                tblDatas.Columns.Add("y坐标");
                tblDatas.Columns.Add("颜色");
                tblDatas.Columns.Add("keycode");
                tblDatas.Columns.Add("按键");
                tblDatas.Columns.Add("group");

                foreach (var item in list)
                {
                    DataRow dr = tblDatas.NewRow();
                    dr["x坐标"] = item.x;
                    dr["y坐标"] = item.y;
                    dr["颜色"] = item.c;
                    dr["keycode"] = item.key;
                    dr["按键"] = helper.Chr(Convert.ToInt32(item.key));
                    dr["group"] = string.IsNullOrEmpty(item.group) ? "" : item.group;
                    tblDatas.Rows.Add(dr);
                }

                dataGridView1.DataSource = tblDatas;
            }
        }

        /// <summary>
        /// 保存配置 导出json
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void button2_Click(object sender, EventArgs e)
        {
            List<xyc> list = new List<xyc>();
            foreach (DataGridViewRow item in this.dataGridView1.Rows)
            {
                if (item.Cells["x坐标"].Value==null)
                {
                    continue;
                }
                xyc xyc = new xyc();
                xyc.x = item.Cells["x坐标"].Value.ToString();
                xyc.y = item.Cells["y坐标"].Value.ToString();
                xyc.c = item.Cells["颜色"].Value.ToString();
                xyc.key = item.Cells["keycode"].Value.ToString();
                xyc.group = item.Cells["group"].Value.ToString();
                list.Add(xyc);
	        }
            string str = JsonConvert.SerializeObject(list);
            //MessageBox.Show(str);

            StreamWriter myStream;
            if (saveFileDialog1.ShowDialog() == DialogResult.OK)
            {
                myStream = new StreamWriter(saveFileDialog1.FileName);
                myStream.Write(str); //写入
                myStream.Close();//关闭流
            }
        }

        protected override void WndProc(ref Message m)
        {
            const int WM_HOTKEY = 0x0312;//如果m.Msg的值为0x0312那么表示用户按下了热键
            //按快捷键 
            switch (m.Msg)
            {
                case WM_HOTKEY:
                    switch (m.WParam.ToInt32())
                    {
                        case 100:    //按下的是Shift+S
                            if (isOn)
                            {
                                SpeechSynthesizer synth = new SpeechSynthesizer();

                                synth.Speak("结束自动攻击");

                                synth.Dispose();

                                isOn = false;

                                if (thread.IsAlive)
                                {
                                    thread.Abort();
                                }
                                if (thread2.IsAlive)
                                {
                                    thread2.Abort();
                                }
                            }
                            else
                            {
                                SpeechSynthesizer synth = new SpeechSynthesizer();

                                synth.Speak("开始自动攻击");

                                synth.Dispose();
                                isOn = true;

                                thread = new Thread(attack);
                                thread.Start();
                                thread2 = new Thread(attack2);
                                thread2.Start();
                            }
                            break;
                        case 101: 
                            //获取鼠标坐标和颜色并保存
                            xyc xyc = new xyc();
                            xyc.x = (Cursor.Position.X).ToString();
                            xyc.y = (Cursor.Position.Y).ToString();
                            xyc.c = helper.ColorHelper.获取指定坐标的16进制颜色(xyc.x, xyc.y);
                            DataRow dr = tblDatas.NewRow();
                            dr["x坐标"] = xyc.x;
                            dr["y坐标"] = xyc.y;
                            dr["颜色"] = xyc.c;
                            dr["keycode"] = "";
                            tblDatas.Rows.Add(dr);

                            break;
                    }
                    break;
            }
            base.WndProc(ref m);
        }

        /// <summary>
        /// 攻击方法
        /// </summary>
        public void attack()
        {
            List<xyc> list = new List<xyc>();
            foreach (DataGridViewRow item in this.dataGridView1.Rows)
            {
                if (item.Cells["x坐标"].Value == null)
                {
                    continue;
                }
                xyc xyc = new xyc();
                xyc.x = item.Cells["x坐标"].Value.ToString();
                xyc.y = item.Cells["y坐标"].Value.ToString();
                xyc.c = item.Cells["颜色"].Value.ToString();
                xyc.key = item.Cells["keycode"].Value.ToString();
                xyc.group = item.Cells["group"].Value.ToString();
                list.Add(xyc);
            }
            attacklist = list;
            while (isOn)
            {
                foreach (var item in attacklist.Where(p=>string.IsNullOrEmpty(p.group)))
                {
                    if (myClassLibrary.helper.ColorHelper.获取指定坐标的16进制颜色(item.x,item.y)==item.c)
                    {
                        helper.键盘.按键(Convert.ToByte(item.key));
                        Random r = new Random();

                        int a = 100;
                        try
                        {
                            a = Convert.ToInt32(this.textBox3.Text);
                        }
                        catch (Exception)
                        {
                        }
                        int b = a + 100;
                        System.Threading.Thread.Sleep(r.Next(a, b));
                        continue;
                    }
                }
            }
        }

        /// <summary>
        /// 攻击辅助
        /// </summary>
        public void attack2()
        {
            List<xyc> list = new List<xyc>();
            foreach (DataGridViewRow item in this.dataGridView1.Rows)
            {
                if (item.Cells["x坐标"].Value == null)
                {
                    continue;
                }
                xyc xyc = new xyc();
                xyc.x = item.Cells["x坐标"].Value.ToString();
                xyc.y = item.Cells["y坐标"].Value.ToString();
                xyc.c = item.Cells["颜色"].Value.ToString();
                xyc.key = item.Cells["keycode"].Value.ToString();
                xyc.group = item.Cells["group"].Value.ToString();
                list.Add(xyc);
            }
            attacklist = list;
            while (isOn)
            {
                foreach (var item in attacklist.Where(p => !string.IsNullOrEmpty(p.group)))
                {
                    if (myClassLibrary.helper.ColorHelper.获取指定坐标的16进制颜色(item.x, item.y) == item.c)
                    {
                        helper.键盘.按键(Convert.ToByte(item.key));
                        Random r = new Random();
                        System.Threading.Thread.Sleep(r.Next(100, 300));
                        continue;
                    }
                }
            }
        }

        private void textBox1_TextChanged(object sender, EventArgs e)
        {
            try
            {
                textBox2.Text = ((int)Convert.ToChar(textBox1.Text)).ToString();
            }
            catch (Exception)
            {
                textBox2.Text = "";
            }
        }

        private void textBox2_TextChanged(object sender, EventArgs e)
        {
            //textBox1.Text = Convert.ToChar(textBox2.Text).ToString();
        }

    }
}
