using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WindowsFormsApplication1
{
    public partial class 桌面取色 : Form
    {
        public 桌面取色()
        {
            InitializeComponent();
        }

        [DllImport("gdi32.dll")]
        static public extern uint GetPixel(IntPtr hDC, int XPos, int YPos);
        [DllImport("gdi32.dll")]
        static public extern IntPtr CreateDC(string driverName, string deviceName, string output, IntPtr lpinitData);
        [DllImport("gdi32.dll")]
        static public extern bool DeleteDC(IntPtr DC);

        static public byte GetRValue(uint color)
        {
            return (byte)color;
        }
        static public byte GetGValue(uint color)
        {
            return ((byte)(((short)(color)) >> 8));
        }
        static public byte GetBValue(uint color)
        {
            return ((byte)((color) >> 16));
        }
        static public byte GetAValue(uint color)
        {
            return ((byte)((color) >> 24));
        }

        public static string colorRGBtoHx16(int R, int G, int B)
        {
            return System.Drawing.ColorTranslator.ToHtml(System.Drawing.Color.FromArgb(R, G, B));
        }


        private void button1_Click(object sender, EventArgs e)
        {
            IntPtr displayDC = CreateDC("DISPLAY",null, null,IntPtr.Zero);
            uint colorref = GetPixel(displayDC, Convert.ToInt32(this.X.Text), Convert.ToInt32(this.Y.Text));

            DeleteDC(displayDC);
            byte Red = GetRValue(colorref);
            byte Green = GetGValue(colorref);
            byte Blue = GetBValue(colorref);

            this.textBox1.Text = colorRGBtoHx16(Red, Green, Blue);


            Color c = Color.FromArgb(255, Red, Green, Blue); //这个是16位组合5位R、5位G、5位B
            this.BackColor = c;
        }

        private void Controls_MouseMove(object sender, MouseEventArgs e)
        {
            //if (checkBox1.Checked)
            //{
            //    // 获取当前屏幕的光标坐标
            //    //Point pTemp = new Point(Cursor.Position.X, Cursor.Position.Y);
            //    this.X.Text = Cursor.Position.X.ToString();
            //    this.Y.Text = Cursor.Position.Y.ToString();

            //}
            
        }

        private void timer1_Tick(object sender, EventArgs e)
        {
            if (checkBox1.Checked)
            {
                // 获取当前屏幕的光标坐标
                //Point pTemp = new Point(Cursor.Position.X, Cursor.Position.Y);
                this.X.Text = (Cursor.Position.X).ToString();
                this.Y.Text = (Cursor.Position.Y).ToString();
                this.button1_Click(sender,e);
            }
        }

        private void Form1_KeyUp(object sender, KeyEventArgs e)
        {
            //MessageBox.Show("您所按动的键是：" + e.KeyCode.ToString());
            if (Keys.F2 == e.KeyCode)
            {
                if (this.checkBox1.Checked) 
                {
                    this.checkBox1.Checked = false;
                }
                else
                {
                    this.checkBox1.Checked = true;
                }

            }
        }



    }
}
